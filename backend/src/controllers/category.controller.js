const Category = require("../models/category.model");

/* =====================================================
   PUBLIC
===================================================== */

/**
 * GET /api/categories/public
 * Catégories accessibles sans authentification
 */
exports.getPublicCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .select("name slug parent")
      .sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    console.error("GET PUBLIC CATEGORIES ERROR:", error);
    res.status(500).json({ message: "Erreur catégories publiques" });
  }
};

/* =====================================================
   ADMIN
===================================================== */

/**
 * GET /api/categories
 * Liste complète des catégories (admin)
 */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("parent")
      .sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    console.error("GET ALL CATEGORIES ERROR:", error);
    res.status(500).json({ message: "Erreur chargement catégories" });
  }
};

/**
 * POST /api/categories
 * Création catégorie (admin)
 */
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, parent } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Le nom et le slug sont obligatoires",
      });
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        message: "Une catégorie avec ce slug existe déjà",
      });
    }

    const category = await Category.create({
      name,
      slug,
      description: description || null,
      parent: parent || null,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    res.status(500).json({ message: "Erreur création catégorie" });
  }
};

/**
 * PUT /api/categories/:id
 * Modification catégorie (admin)
 */
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, description, parent } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description: description || null,
        parent: parent || null,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json(category);
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    res.status(500).json({ message: "Erreur modification catégorie" });
  }
};

/**
 * DELETE /api/categories/:id
 * Suppression catégorie (admin)
 */
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    res.json({ message: "Catégorie supprimée" });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    res.status(500).json({ message: "Erreur suppression catégorie" });
  }
};
