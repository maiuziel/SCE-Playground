import {Feedback} from '../data-access/feedback.model.js';

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment, supportRequestId } = req.body;

    const feedback = await Feedback.create({ rating, comment, supportRequestId });

    res.status(201).json(feedback);
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
