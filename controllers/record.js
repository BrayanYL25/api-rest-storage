import { UnauthorizedAction } from '../utils/error_factory.js'
import {
  checkRecord,
  checkRecordId,
  checkUpdateRecord
} from '../schemas/records.js'
import { Storage } from '../models/local.js'

export default class RecordController {
  static getIncomeRecords = async (req, res) => {
    try {
      if (!req.session.user) {
        throw new UnauthorizedAction('Unauthorized Action: Get Income records')
      }

      const records = await Storage.getIncomeRecords()
      res.json(records)
    } catch (e) {
      console.error(e.message)
      res.status(400).json({ msg: 'There was an error' })
    }
  }

  static getExpensesRecords = async (req, res) => {
    try {
      if (!req.session.user) {
        throw new UnauthorizedAction('Unauthorized Action: Get Income records')
      }

      const records = await Storage.getExpensesRecords()
      res.json(records)
    } catch (e) {
      console.error(e.message)
      res.status(400).json({ msg: 'There was an error' })
    }
  }

  static getAllRecords = async (req, res) => {
    try {
      if (!req.session.user) {
        throw new UnauthorizedAction('Unauthorized Action: Get Income records')
      }

      const records = await Storage.getAllRecords()
      res.json(records)
    } catch (e) {
      console.error(e.message)
      res.status(400).json({ msg: 'There was an error' })
    }
  }

  static createRecord = async (req, res) => {
    try {
      if (!req.session.user) {
        throw new UnauthorizedAction('Forbbiden to access records')
      }
      const {
        product_id,
        user_id,
        record_type_id,
        record_quantity,
        record_date
      } = req.body

      const { data, error } = checkRecord({
        productId: Number(product_id),
        user_id: Number(user_id),
        record_type_id,
        record_quantity,
        record_date
      })

      if (error) return res.status(422).json({ msg: error })
      const newRecord = await Storage.createRecord({
        product_id: data.product_id,
        user_id: data.user_id,
        record_type_id: data.record_type_id,
        record_quantity: data.record_quantity,
        record_date: data.record_date
      })

      res.json(newRecord)
    } catch (e) {
      if (e.message === 'Forbbiden to access records') {
        res.status(403).json({ msg: e.message })
      } else {
        res.status(403).json({ msg: e.message })
      }
    }
  }

  static updateRecord = async (req, res) => {
    try {
      if (!req.session.user) {
        throw new UnauthorizedAction('Unauthorized Action: Update Record')
      }
      const checkId = checkRecordId(Number(req.params.id))
      const checkSchema = checkUpdateRecord(req.body)

      if (checkSchema.error)
        return res.status(422).json({ msg: checkSchema.error })

      const updatedRecord = await Storage.updateRecord({
        record_id: checkId.data,
        ...checkSchema.data
      })

      res.json(updatedRecord)
    } catch (e) {
      if (e instanceof UnauthorizedAction) {
        return res.status(401).json({ msg: e.message })
      }
      console.error(e.message)
    }
  }
}