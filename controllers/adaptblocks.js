import Adapt from "../models/Adapt.js"
import AdaptBlock from "../models/AdaptBlock.js"


export const createAdaptBlock = async (req, res) => {
    try {
        const {  adaptId, insId } = req.body


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
        const adaptBlocks = await AdaptBlock.find({ adaptId: req.params.id })
        res.status(200).json(adaptBlocks)
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