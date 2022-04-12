var express = require('express');
var router = express.Router();

var db = 'mongodb+srv://HuuPhuc:NHUUphuc672002@cluster0.ns7fk.mongodb.net/ViewAnhASM?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
///////////// Hiện Dữ Liệu //////////////////////
router.get('/anhHot',function (rep,res) {
  ViewAnhASM.find({},function (err,data) {
    res.render('AnhHot',{data:data})
    console.log(data)
  })
});
router.get('/GetAlllanhHot',function (rep,res) {
  ViewAnhASM.find({},function (err,data) {
    res.send(data)

  })
});
////////////////////////////////////////////////////////
router.get('/themAnh',function (rep,res) {
  res.render('ThemAnh',{title:'',mesaage:''});
});
router.get('/gioiThieu',function (rep,res) {
  res.render('GioiThieu',{title:'',mesaage:''});
});
router.get('/suaAnh',function (rep,res) {
  ViewAnhASM.find({},function (err,data) {
    res.render('SuaAnh',{data:data})
    console.log(data)
  })
});
router.post('/dataUpdate', function (request, response){
  var idPhotoUpdate = request.body.idPhotoUpdate;

  console.log(idPhotoUpdate);
  ViewAnhASM.find({_id : idPhotoUpdate}, function (err, data){
    response.render('SuaAnh', { data: data });
  })
});
///////// Chuyền Dữ Liệu////////////////
var VewAnhs=new mongoose.Schema({
  tAnh:'string',
  ndAnh:'string',
  ntAnh:'string',
  linkAnh:'string'

});
var ViewAnhASM=mongoose.model('VewAnh',VewAnhs)
router.post('/ThemHAnh',function (repuest,response){
  var ntenAnh=repuest.body.tAnh;
  var nndAnh=repuest.body.ndAnh;
  var nngtAnh=repuest.body.ntAnh;
  var nlinkAnh=repuest.body.linkAnh;

  console.log(ntenAnh+nndAnh+nngtAnh+nlinkAnh);

  const data = new ViewAnhASM( {
    tAnh:ntenAnh,
    ndAnh:nndAnh,
    ntAnh:nngtAnh,
    linkAnh:nlinkAnh
  });
  data.save(function (error){
    var mes;
    if (error==null){
      mes ='Thêm Ảnh Thành Công'
      console.log('Thêm Ảnh Thành Công')
    }else mes=error
    response.render('themAnh',{message:mes})
  })
  response.render('themAnh')

})

router.post('/SuaHAnh',function (repuest,response){

  var ntenAnh=repuest.body.tAnh;
  var nndAnh=repuest.body.ndAnh;
  var nngtAnh=repuest.body.ntAnh;
  var nlinkAnh=repuest.body.linkAnh;

  console.log(ntenAnh+nndAnh+nngtAnh+nlinkAnh);
  ViewAnhASM.updateOne({tAnh:ntenAnh},{ndAnh:nndAnh,ntAnh:nngtAnh,linkAnh:nlinkAnh},function (err) {
    if (err) throw err;

  })

})

router.post('/xaoAnh',function (req , res ){
  let ObejectID = require('mongodb').ObjectId;
  var id = req.body.id;
  ViewAnhASM.deleteOne({_id :  ObejectID(id)}, function (err){
    if(err){
      console.log("lỗi ");
    }else {
      console.log("Xóa thành công")
    }
  })
})

module.exports = router;
