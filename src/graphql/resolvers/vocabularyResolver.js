module.exports =  {

    Query: {
        vocabularies: (parent, args, {db}, info) => db.Vocabulary.findAll(),
        vocabulary: (parent, args, {db}, info) => db.Vocabulary.findById(id),
    },
    Mutation: {
        createVocabulary: (parent, {en, es}, {db}, info) =>
            db.Vocabulary.create({
                en: en,
                es: es,
            }),
        updateVocabulary: (parent, {id, en, es}, {db}, info) =>
            db.Vocabulary.update({
                    en: en,
                    es: es,
                },
                {
                    where: {
                        id: id
                    }
                }),
        deleteVocabulary: (parent, {id}, {db}, info) =>
            db.Vocabulary.destroy({
                where: {
                    id: id
                }
            })
    }
};