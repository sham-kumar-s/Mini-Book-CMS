let counters = {
    books : 1,
    chapters : 1,
    pages : 1
}

const generateId = (type) => {
    const key = type.toLowerCase() + 's'; // Convert to lowercase and pluralize
    const id = `${type.toLowerCase()}_${String(counters[key]++).padStart(3,"0")}`;
    return id;
}

export default generateId;