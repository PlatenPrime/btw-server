import Adapt from "../models/Adapt.js";
import AdaptBlock from "../models/AdaptBlock.js";


// Create One Adapt       
export const createAdapt = async (req, res) => {
    try {
        const { title } = req.body

        const newAdapt = new Adapt({ title })

        await newAdapt.save()

        return res.status(201).json(newAdapt)

    } catch (error) {
        res.json({ message: "Щось не так зі створенням адаптації" })
    }
}



// Get All Adapts

export const getAllAdapts = async (req, res) => {
    try {
        const adapts = await Adapt.find().sort('title')
        res.status(200).json(adapts)
    } catch (error) {
        res.json({ message: error.message })
    }
}


// Get Adapt By Id


export const getAdaptById = async (req, res) => {
    try {
        const adapt = await Adapt.findById(req.params.id)
        res.status(200).json(adapt)
    } catch (error) {
        res.json({ message: error.message })
    }
}



// Update One Adapt


export const updateAdaptById = async (req, res) => {
    try {
        const { title, blocks, test } = req.body

        const adapt = await Adapt.findById(req.params.id)

        if (!adapt) {
            return res.status(404).json({ message: 'Adapt not found' })
        }

        if (title) adapt.title = title
        if (blocks) adapt.blocks = blocks
        if (test) adapt.test = test

        await adapt.save()
        res.status(200).json(adapt)
    } catch (error) {
        res.json({ message: error.message })
    }
}



// Delete One Adapt


export const deleteAdaptById = async (req, res) => {
    try {
        const adapt = await Adapt.findById(req.params.id)

        if (!adapt) {
            return res.status(404).json({ message: 'Adapt not found' })
        }

        await AdaptBlock.deleteMany({ _id: { $in: adapt.blocks } })

        await Adapt.findByIdAndDelete(req.params.id)

        res.status(200).json({ "message": "Adapt deleted" })
    } catch (error) {
        res.json({ message: error.message })
    }
}