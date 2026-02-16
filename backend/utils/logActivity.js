import ActivityModel from '../models/activityModel.js'

export const logActivity = async ({
  adminId,
  action,
  entityType,
  entityId,
  details = {}
}) => {
  try {
    await ActivityModel.create({
      adminId,
      action,
      entityType,
      entityId,
      details
    })
  } catch (err) {
    console.error('Activity log failed:', err.message)
  }
}
