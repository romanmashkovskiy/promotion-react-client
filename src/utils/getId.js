export default (db, entity) => {
    return entity.id || entity._id;
}