export const createItem = async (req, res) => {
    try {
      const user = req.user; // נשלף מה-token
      const item = await Item.create({ name: req.body.name, userId: user.id });
  
      res.status(201).json({
        id: item.id,
        name: item.name,
        userName: user.name,
      });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  