import Idea from '../models/Idea';
import IdeaCategory from '../models/IdeaCategory';
import SendError from '../services/SendError';

class IdeaController {
  async store(req, res, next) {
    try {
      const { category_id } = req.body;

      const categoryExists = await IdeaCategory.findByPk(category_id);

      if (!categoryExists) {
        throw new SendError('Not Found', 'Category not found!', 404);
      }

      const idea = await Idea.create({
        ...req.body,
        author_id: req.userId,
      });

      return res.status(201).json(idea);
    } catch (error) {
      return next(error);
    }
  }
}

export default new IdeaController();
