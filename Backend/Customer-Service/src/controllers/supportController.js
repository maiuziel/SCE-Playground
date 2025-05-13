// Backend/Customer-Service/src/Controller/supportController.js
import { SupportRequest } from '../data-access/supportRequest.model.js';
import {Op} from 'sequelize';

// POST /support-requests/
export async function createSupportRequest(req, res) {
    const { subject, description } = req.body;
    try {
        await SupportRequest.create({ subject, description });
        res.status(201).json({ message: 'Support request received' });
    } catch (err) {
        console.error('Error saving support request:', err);
        res.status(500).json({ message: 'Failed to save support request' });
    }
}

// GET /support-requests/
export async function getSupportRequests(req, res) {
    try {
        const all = await SupportRequest.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(all);
    } catch (err) {
        console.error('Error fetching support requests:', err);
        res.status(500).json({ message: 'Failed to fetch support requests' });
    }
}

// PATCH /support-requests/:id/status
export async function updateSupportRequestStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const reqItem = await SupportRequest.findByPk(id);
        if (!reqItem) return res.status(404).json({ message: 'Not found' });
        reqItem.status = status;
        await reqItem.save();
        res.json({ message: 'Status updated' });
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(500).json({ message: 'Failed to update status' });
    }
}

// POST /support-requests/:id/respond
export async function respondToSupportRequest(req, res) {
    const { id } = req.params;
    const { response } = req.body;
    try {
        const reqItem = await SupportRequest.findByPk(id);
        if (!reqItem) return res.status(404).json({ message: 'Not found' });
        reqItem.response = response;
        await reqItem.save();
        res.json({ message: 'Response saved' });
    } catch (err) {
        console.error('Error saving response:', err);
        res.status(500).json({ message: 'Failed to save response' });
    }
}

// GET /support-requests/unread
export async function getUnreadSupportRequests(req, res) {
    try {
        const unread = await SupportRequest.findAll({
            where: {
                responseMessage: { [Op.ne]: null },
                responseMessageRead: false,
            },
            order: [['createdAt', 'DESC']],
        });
        res.json(unread);
    } catch (err) {
        console.error('Error fetching unread messages:', err);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
}