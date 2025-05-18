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

// PATCH /support-requests/:id/respond
export async function respondToSupportRequest(req, res) {
    const { id } = req.params;
    const { response } = req.body;
  
    try {
      const reqItem = await SupportRequest.findByPk(id);
      if (!reqItem) return res.status(404).json({ message: 'Not found' });
  
      reqItem.response = response;
      reqItem.responseMessageRead = false; // ✅ מסומן כלא נקרא
      await reqItem.save();
  
      res.json({ message: 'Response saved successfully', request: reqItem });
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
          response: { [Op.ne]: null },
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
  
// PATCH /support-requests/:id/mark-read
export async function markResponseAsRead(req, res) {
    const { id } = req.params;
  
    try {
      const request = await SupportRequest.findByPk(id);
      if (!request) {
        return res.status(404).json({ message: 'Support request not found' });
      }
  
      request.responseMessageRead = true; 
      await request.save();
  
      res.status(200).json({ message: 'Marked as read' });
    } catch (err) {
      console.error('Error marking response as read:', err);
      res.status(500).json({ message: 'Failed to mark response as read' });
    }
  }

export const getNewClientRequests = async (req, res) => {
  try {
    const newRequests = await SupportRequest.findAll({
      where: {
        response: null,
        status: 'open'
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(newRequests);
  } catch (error) {
    console.error('❌ Error fetching new client requests:', error);
    res.status(500).json({ error: 'Failed to load new client requests' });
  }
};

export async function addClientComment(req, res) {
  const { comment } = req.body;
  const { id } = req.params;

  try {
    const request = await SupportRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.clientComment = comment;
    await request.save();

    res.status(200).json({
      message: 'Comment added successfully',
      request: request.get({ plain: true }) 
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




