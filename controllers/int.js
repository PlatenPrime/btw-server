import Int from "../models/Int.js";
import IntBlock from "../models/IntBlock.js";


// Create One Int       
export const createInt = async (req, res) => {
    try {
        const { title } = req.body

        const newInt = new Int({ title })

        await newInt.save()

        return res.status(201).json(newInt)

    } catch (error) {
        res.json({ message: "Щось не так с створенням інтеграції" })
    }
}



// Get All Ints

export const getAllInts = async (req, res) => {
    try {
        const ints = await Int.find().sort('title')
        res.status(200).json(ints)
    } catch (error) {
        res.json({ message: error.message })
    }
}


// Get Int By Id


export const getIntById = async (req, res) => {
    try {
        const int = await Int.findById(req.params.id)
        res.status(200).json(int)
    } catch (error) {
        res.json({ message: error.message })
    }
}



// Update One Int


export const updateIntById = async (req, res) => {
    try {
        const { title, blocks } = req.body

        const int = await Int.findById(req.params.id)

        if (title) int.title = title
        if (blocks) int.blocks = blocks

        await int.save()
        res.status(200).json(int)
    } catch (error) {
        res.json({ message: error.message })
    }
}



// Delete One Int


export const deleteIntById = async (req, res) => {
    try {
        const int = await Int.findById(req.params.id)

        if (!int) {
            return res.status(404).json({ message: 'Int not found' })
        }

        await IntBlock.deleteMany({ _id: { $in: int.blocks } })

        await Int.findByIdAndDelete(req.params.id)

        res.status(200).json({ "message": "Int deleted" })
    } catch (error) {
        res.json({ message: error.message })
    }
}