import Art from "../models/Art.js";
import Ask from "../models/Ask.js";
import User from "../models/User.js";
import { sendMessageToTelegram } from "../utils/sendMessagesTelegram.js";

// Create the ask

const VadimVladislava = [
  "658fd47894302d8e7da6d255",
  "65a8d938894d5d3bd5bc9e6e",
];

export const createAsk = async (req, res) => {
  try {
    const { artikul, quant, status, asker, solver, com } = req.body;
    const askerUser = await User.findById(asker);
    const askerData = {
      _id: askerUser._id,
      fullname: askerUser.fullname,
      telegram: askerUser.telegram,
      photo: askerUser.photo,
    };

    const art = await Art.findOne({ artikul });
    const nameukr = art?.nameukr || "";

    const newAsk = new Ask({
      artikul,
      nameukr,
      quant,
      status,
      asker,
      solver,
      com,
      askerData,
    });

    await newAsk.save();

    if (VadimVladislava.includes(asker)) {
      sendMessageToTelegram(`
			${askerUser?.fullname}: необхідно зняти ${nameukr}.
			${quant ? `Кількість: ${quant} шт` : ""}
			${com ? `Коментарій: ${com}` : ""}
			`);
    }

    return res.status(201).json(newAsk);
  } catch (error) {
    res.json({ message: "Ошибка создания запроса на снятие" });
  }
};

// Get All Asks

export const getAllAsks = async (req, res) => {
  try {
    const asks = await Ask.find().sort({ createdAt: -1 }).limit(100);

    if (!asks || asks.length === 0) {
      return res.json({ message: "Запросов на снятие нет" });
    }

    res.status(200).json({ asks });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Получение объекта Ask по ID
export const getAskById = async (req, res) => {
  try {
    const ask = await Ask.findById(req.params.id);

    if (!ask) {
      return res.status(404).json({ message: "Ask not found" });
    }
    res.status(200).json(ask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Редактирование объекта Ask по его ID
export const updateAskById = async (req, res) => {
  try {
    const { solver } = req.body;
    const updateData = req.body;

    if (solver) {
      const solverUser = await User.findById(solver);
      if (solverUser) {
        const solverData = {
          _id: solverUser._id,
          fullname: solverUser.fullname,
          telegram: solverUser.telegram,
          photo: solverUser.photo,
        };
        updateData.solverData = solverData;
      }
    }

    const updatedAsk = await Ask.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.status(200).json(updatedAsk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Ask from DB

export const deleteAskById = async (req, res) => {
  try {
    const ask = await Ask.findByIdAndDelete(req.params.id);
    if (!ask) return res.json({ message: "Такого запроса на снятие нет" });

    res.status(200).json({ message: "Запрос на снятие был удален." });
  } catch (error) {
    res.json({ message: "Что-то не так с удалением запроса на снятие." });
  }
};
