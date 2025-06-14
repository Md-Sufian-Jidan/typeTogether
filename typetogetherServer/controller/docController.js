import Document from "../schema/docSchema.js";

export const getDocument = async (id) => {
    if (!id) return null;

    const document = await Document.findById(id);

    if (document) return document;

    return await Document.create({ _id: id, data: "" });
    ;
};

export const updateDocument = async (id, data) => {
    if (!id) return null;

    return await Document.findByIdAndUpdate(
        id,
        { data },
        { new: true }
    );
};

