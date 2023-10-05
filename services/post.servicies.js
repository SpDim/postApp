const { dataSource } = require('../connect');
const PostEntiry = require('../model/Post').PostEntity;

function findAll() {
    const result = dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.categories", "category")
        .getMany()

    return result;
}

function findOne(id) {
    const result = dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.categories", "category")
        .where("post.id = :id", { id: id })
        .getOne();

    return result;
}

function create(data) {
    const result = dataSource
        .getRepository(PostEntiry)
        .save(data)
        .catch((err) => console.log('Problem in saving post...', err));

    return result;
}

function updatePost(data) {
    const result = dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder()
        .update(PostEntiry)
        .set({
            title: data.title,
            text: data.text
        })
        .where("id = :id", { id: data.id })
        .execute();

    return result;
}

async function updateCategory(data) {
    const actualRelationships = await dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder()
        .relation(PostEntiry, "categories")
        .of(data.id)
        .loadMany()

    console.log("1>>>", actualRelationships);

    const result = await dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder()
        .relation(PostEntiry, "categories")
        .of(data.id)
        .addAndRemove(data.categories, actualRelationships)
        .catch(err => console.log('Cannot update categories!', err))
        
    console.log('2>>>', result);
    return result;
}

function deletePost(id) {
    const result = dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder()
        .delete()
        .from(PostEntiry)
        .where('id = :id', { id: id })
        .execute();
    
    return result;
}

function deleteCategories(data) {
    const result = dataSource
        .getRepository(PostEntiry)
        .createQueryBuilder()
        .relation(PostEntiry, "categories")
        .of(data)
        .remove(data.categories)
        .catch(err => console.log('Error:', err));

    return result;
}

module.exports = { findAll, findOne, create, updatePost, updateCategory, deletePost, deleteCategories };
