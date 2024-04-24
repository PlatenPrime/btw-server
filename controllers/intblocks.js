import Int from "../models/Int.js"
import IntBlock from "../models/IntBlock.js"


export const createIntBlock = async (req, res) => {
    try {
        const { title, intId, insId } = req.body


        const newIntBlock = new IntBlock({ title, intId, insId })

        await Int.findByIdAndUpdate(
            intId,
            { $push: { blocks: newIntBlock._id } },
            { new: true })

        await newIntBlock.save()
        res.status(201).json(newIntBlock)
    } catch (error) {
        res.json({ message: "Щось не так зі створенням блоку інтеграції" })
    }
}


export const getAllIntBlocks = async (req, res) => {
    try {
        const intBlocks = await IntBlock.find()
        res.status(200).json(intBlocks)
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const getIntBlockById = async (req, res) => {
    try {
        const intBlock = await IntBlock.findById(req.params.id)
        res.status(200).json(intBlock)
    } catch (error) {
        res.json({ message: error.message })
    }
}



export const updateIntBlockById = async (req, res) => {
    try {
        const { title, insId } = req.body
        const intBlock = await IntBlock.findById(req.params.id)
        if (title) intBlock.title = title
        if (insId) intBlock.insId = insId
        await intBlock.save()
        res.status(200).json(intBlock)
    } catch (error) {
        res.json({ message: error.message })
    }
}



export const deleteIntBlockById = async (req, res) => {
    try {
        const intBlock = await IntBlock.findById(req.params.id)

        await Int.updateMany(
            { blocks: intBlock._id },
            { $pull: { blocks: intBlock._id } })

        await IntBlock.findByIdAndDelete(req.params.id)

        res.status(200).json("IntBlock deleted")
    } catch (error) {
        res.json({ message: error.message })
    }
}