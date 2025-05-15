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

// 2. עדכון סטטוס הפנייה
export async function updateSupportRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const reqItem = await SupportRequest.findByPk(id);
    if (!reqItem) return res.status(404).json({ message: 'Not found' });

    reqItem.status = status;
    await reqItem.save();
    res.json(reqItem);
  } catch (err) {
    next(err);
  }
}

// 3. קבלת כל הפניות
export async function getSupportRequests(req, res) {
  try {
    const allRequests = await SupportRequest.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.json(allRequests);
  } catch (err) {
    console.error('Error fetching support requests:', err);
    return res.status(500).json({ message: 'Failed to fetch support requests' });
  }
}

// 4. שליחת תגובה ללקוח (ושמירתה)
export async function respondToSupportRequest(req, res, next) {
  try {
    const { id } = req.params;
    const { message } = req.body; // ⬅️ קלט מה-Frontend או Postman

    const request = await SupportRequest.findByPk(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.responseMessage = message; // ⬅️ שמירת התגובה בשדה הנכון
    request.responseMessageRead = false; // ⬅️ סימון שלא נקרא
    await request.save();

    res.json({ message: 'Response saved successfully', request });
  } catch (err) {
    console.error('Error saving response:', err);
    next(err);
  }
}



// 5. קבלת כל הפניות עם תגובה שלא נקראה (לצורך התראה ללקוח)
export async function getUnreadResponses(req, res, next) {
  try {
    const unread = await SupportRequest.findAll({
      where: { responseMessageRead: false },
      order: [['updatedAt', 'DESC']],
    });
    res.json(unread);
  } catch (err) {
    next(err);
  }
}

// 6. סימון הודעה כנקראה (כשהלקוח נכנס לראות אותה)
export async function markResponseAsRead(req, res, next) {
  try {
    const { id } = req.params;

    const request = await SupportRequest.findByPk(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.responseMessageRead = true;
    await request.save();

    res.json({ message: 'Marked as read' });
  } catch (err) {
    next(err);
  }
}
