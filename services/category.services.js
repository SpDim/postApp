const CategoryEntity = require('../model/Category').CategoryEntity;
const dataSource = require('../connect').dataSource;

// select('category') -> select * from CategoryEntity as category
function findAll() {
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .select('category')
        .from(CategoryEntity, 'category')
        .getMany();

    return result;
}

function findOne(value) {
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .select('ct')
        .from(CategoryEntity, 'ct')
        .where('ct.id = :x', { x: value })
        .getOne();

    return result;
}

function create(categoryName) {
    console.log('Service Category Create', categoryName);

    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .insert()
        .into(CategoryEntity)
        .values([
            { name: categoryName }
        ])
        .execute()
        .catch(err => console.log('Error:', err));
        
    return result;
}


function update(data) {
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .update(CategoryEntity)
        .set({ name: data.name })
        .where('id = :id', { id: data.id })
        .execute()
        .catch(error => console.log('Error:', error));

    return result;
}

function deleteCategory(value) {
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .delete()
        .from(CategoryEntity)
        .where('id = :x', { x: value })
        // .getQuery()
        .execute()
        .catch(error => console.log('Error:', error));

    return result;
}

module.exports = { findAll, findOne, create, update, deleteCategory };
