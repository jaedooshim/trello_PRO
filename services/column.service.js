const ColumnRepository = require('../repositories/column.repository');
const CustomError = require('../_utills/customClass');

class ColumnService {
  columnRepository = new ColumnRepository();

  // 컬럼 생성 메서드
  createColumn = async (boardId, columnName) => {
    // 예외처리
    if (!columnName) throw new CustomError('컬럼명을 형식에 맞게 입력해주세요.', 412);
    // 생성요청
    const createColumnData = await this.columnRepository.createColumn(boardId, columnName);
    // 반환값
    return {
      id: createColumnData.id,
      boardId: createColumnData.boardId,
      columnName: createColumnData.columnName,
      location: createColumnData.location,
      createdAt: createColumnData.createdAt,
      updatedAt: createColumnData.updatedAt,
    };
  };

  // 컬럼 조회 메서드
  findAllColumn = async (boardId) => {
    // 컬럼 데이터 요청
    const data = await this.columnRepository.findAllColumn(boardId);

    if (data.length === 0) {
      return data;
    } else {
      // 기존 컬럼 순으로 조회
      data.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      // 반환값
      return data.map((column) => {
        return {
          id: column.id,
          boardId: column.boardId,
          columnName: column.columnName,
          location: column.location,
          createdAt: column.createdAt,
          updatedAt: column.updatedAt,
        };
      });
    }
  };

  // 컬럼명 수정 메서드
  updateColumn = async (boardId, columnId, columnName) => {
    // 예외처리
    if (!columnName) throw new CustomError('컬럼명을 형식에 맞게 입력해주세요.', 412);

    const updateColumnData = await this.columnRepository.updateColumn(boardId, columnId, columnName);
    // 반환값
    return {
      id: columnId,
      boardId: boardId,
      columnName: updateColumnData.columnName,
      location: updateColumnData.location,
      createdAt: updateColumnData.createdAt,
      updatedAt: updateColumnData.updatedAt,
    };
  };

  // 컬럼 삭제 메서드
  deleteColumn = async (boardId, columnId) => {
    await this.columnRepository.deleteColumn(boardId, columnId);
    // 반환값
    return true;
  };
}

module.exports = ColumnService;
