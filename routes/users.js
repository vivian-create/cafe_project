import express from 'express';
import bodyParser from "body-parser";
import {  homePage,countryPage,cafeinfo,studypage,chatpage,countryResult} from '../controllers/web_controller.js';
const app = express();

app.use(express.urlencoded());


app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
router.get('/',homePage); // '/'=>預設網址, 跳到controller的homepage介面
router.post('/studycafe_info',cafeinfo); 
router.get('/study_page',studypage); 
router.get('/chat_page',chatpage); 
router.post('/chatcafe_info',cafeinfo); 
router.post('/countrycafe_info',cafeinfo); 
router.get('/country_page',countryPage); 
router.post('/country_result',countryResult); 
export default router;