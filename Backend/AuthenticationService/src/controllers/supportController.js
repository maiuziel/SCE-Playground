// Backend/AuthenticationService/src/controllers/supportController.js
import { SupportRequest } from '../data-access/supportRequest.model.js';

// 1. יצירת פנייה
export async function createSupportRequest(req, res, next) {
  try {
    const { subject, description } = req.body;
    const newReq = await SupportRequest.create({ subject, description, status: 'open' });
    res.status(201).json(newReq);
  } catch (err) {
    next(err);
  }
}

// 2. שליפת כל הפניות
export async function getSupportRequests(req, res, next) {
  try {
    const all = await SupportRequest.findAll({ order: [['createdAt', 'DESC']] });
    res.json(all);
  } catch (err) {
    next(err);
  }
}

// 3. עדכון סטטוס הפנייה
export async function updateSupportRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // למשל: 'in_progress' או 'closed'
    const reqItem = await SupportRequest.findByPk(id);
    if (!reqItem) return res.status(404).json({ message: 'Not found' });

    reqItem.status = status;
    await reqItem.save();
    res.json(reqItem);
  } catch (err) {
    next(err);
  }
}
