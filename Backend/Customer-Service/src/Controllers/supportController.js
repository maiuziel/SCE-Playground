// Backend/Customer-Service/src/Controller/supportController.js
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
// authentication-service/src/controllers/supportController.js


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

