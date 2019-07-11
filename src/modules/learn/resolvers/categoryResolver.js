module.exports =  {
    Category: {
        vocabularies: (parent, args, context, info) => parent.getVocabularies(),
    },

    Query: {
        categories: (parent, args, {db}, info) => db.Category.findAll(),
        category: (parent, args, {db}, info) => db.Category.findByPk(id),
    },
    Mutation: {
        createCategory: (parent, {name, description}, {db}, info) =>
            db.Category.create({
                name: name,
                description: description,
            }),
        updateCategory: (parent, {id, name, description}, {db}, info) =>
            db.Category.update({
                    name: name,
                    description: description,
                },
                {
                    where: {
                        id: id
                    }
                }),
        deleteCategory: (parent, {id}, {db}, info) =>
            db.Category.destroy({
                where: {
                    id: id
                }
            })
    }
};