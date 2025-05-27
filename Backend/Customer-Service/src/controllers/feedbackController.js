import { Feedback } from '../data-access/feedback.model.js';
import { Notification } from '../data-access/notification.model.js';

export async function submitFeedback(req, res) {
  const { rating, comment, supportRequestId } = req.body;

  try {
    // שליחת הפידבק
    await Feedback.create({
      rating,
      comment,
      supportRequestId
    });

    // סימון ההתראה כנקראה (אם קיימת)
    await Notification.update(
      { read: true },
      { where: { supportRequestId, type: 'feedback_prompt' } }
    );

    res.status(201).json({ message: 'Feedback submitted and notification marked as read' });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
}
