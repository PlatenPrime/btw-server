import Adapt from "../models/Adapt.js"
import AdaptBlock from "../models/AdaptBlock.js"


export const createAdaptBlock = async (req, res) => {
    try {
        const { adaptId, insId } = req.body


        const newAdaptBlock = new AdaptBlock({ adaptId, insId })

        await Adapt.findByIdAndUpdate(
            adaptId,
            { $push: { blocks: newAdaptBlock._id } },
            { new: true })

        await newAdaptBlock.save()
        res.status(201).json(newAdaptBlock)
    } catch (error) {
        res.json({ message: "Щось не так зі створенням блоку інтеграції" })
    }
}


export const getAllAdaptBlocks = async (req, res) => {
    try {
        const adaptBlocks = await AdaptBlock.find()
        res.status(200).json(adaptBlocks)
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const getAdaptBlocksByAdaptId = async (req, res) => {
    try {
        // Получаем документ Adapt с указанным id
        const adapt = await Adapt.findById(req.params.id).populate('blocks');

        if (!adapt) {
            return res.status(404).json({ message: 'Adapt not found' });
        }

        // Получаем массив блоков в том порядке, в котором они записаны в документе Adapt
        const adaptBlocks = adapt.blocks;

        res.status(200).json(adaptBlocks);
    } catch (error) {
        res.json({ message: error.message })
    }
}





export const getAdaptBlockById = async (req, res) => {
    try {
        const adaptBlock = await AdaptBlock.findById(req.params.id)
        res.status(200).json(adaptBlock)
    } catch (error) {
        res.json({ message: error.message })
    }
}



export const updateAdaptBlockById = async (req, res) => {
    try {
        const { insId } = req.body
        const adaptBlock = await AdaptBlock.findById(req.params.id)
        if (insId) adaptBlock.insId = insId
        await adaptBlock.save()
        res.status(200).json(adaptBlock)
    } catch (error) {
        res.json({ message: error.message })
    }
}



export const deleteAdaptBlockById = async (req, res) => {
    try {
        const adaptBlock = await AdaptBlock.findById(req.params.id)

        await Adapt.updateMany(
            { blocks: adaptBlock._id },
            { $pull: { blocks: adaptBlock._id } })

        await AdaptBlock.findByIdAndDelete(req.params.id)

        res.status(200).json("AdaptBlock deleted")
    } catch (error) {
        res.json({ message: error.message })
    }
}



// Новый контроллер для обновления свойства isDone
export const updateAdaptBlockIsDone = async (req, res) => {
    try {
        const { userId, isDone } = req.body;
        const adaptBlock = await AdaptBlock.findById(req.params.id);
        adaptBlock.isDone.set(userId, isDone);
        await adaptBlock.save();
        res.status(200).json(adaptBlock);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Новый контроллер для получения состояния isDone для конкретного пользователя
export const getAdaptBlockIsDone = async (req, res) => {
    try {
        const { userId } = req.params;
        const adaptBlock = await AdaptBlock.findById(req.params.id);
        const isDone = adaptBlock.isDone.get(userId) || false;
        res.status(200).json({ userId, isDone });
    } catch (error) {
        res.json({ message: error.message });
    }
};