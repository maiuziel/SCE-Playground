import {
  insertReport,
  fetchAllReports,
  fetchReportById,
  changeReportStatus,
  sequelize,
  fetchSummaryReport,
  fetchMonthlyReport
} from '../data-access/db.js';

export const createReportService = async (data) => await insertReport(data);
export const getAllReportsService = async () => await fetchAllReports();
export const getReportByIdService = async (id) => await fetchReportById(id);
export const updateReportStatusService = async (id, status) => await changeReportStatus(id, status);
export const getSummaryReportService = async () => { return await fetchSummaryReport();
};
export const getMonthlyReportService = async (year, month) => {
  return await fetchMonthlyReport(year, month); 
};

