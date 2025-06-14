import Document from "../schema/docSchema";

export const getDocument = async (id) => {
    if (id === null) return;
    const readyDocument = await Document.findById(id);

    if (readyDocument) return Document;

    return await Document.create({ _id: id, data: "" });
};

export const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data });
}

