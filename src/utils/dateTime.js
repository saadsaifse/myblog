import moment from "moment"
import config from "../../site-config"
export const formatDate = date => moment.utc(date).format(config.dateFormat)
