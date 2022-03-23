const { User, ShopCart, Product } = require('../db/models');

const create = async (req,res) => {
  const admin = await User.findOne({where: {login: req.session.superuser, isAdmin: true}})
  
  let path = req.files[0].path
  path = path.slice(6,path.length)
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    stars_count: 0,
    img: req.files ? path : '',
    user_id: admin.id
  })
  try{
    await newProduct.save();
    res.redirect('/')
  } catch {
    console.log('\n\nОшибка в trackControl  create')
  } 
}

const addLike = async (req, res) => {
  const { oneTrackId } = req.body;
  let thisTrack = await Sound.findOne({where: {id: oneTrackId}})
  let thisTrackLikes = thisTrack.likes;
  thisTrackLikes += 1;
  let updatethisTrack = await Sound.update({ likes: thisTrackLikes}, { where: {id: oneTrackId}, returning: true, plain: true});
  return res.json(thisTrackLikes);
};

const deleteTrack = async (req, res) => {
  let { oneTrackId } = req.body;
  if(req.session.superuser) {
    // console.log('res.locals ===>', res.locals)
    try {
      // console.log(req.params.id)
      await Sound.destroy({where:{id: oneTrackId}});
      return res.send(idboxDelete)
    } catch (error) {
      return res.json({ isDeleteSuccessful: false, errorMessage: 'Не удалось удалить запись из базы данных.' });
    }
  }
};

const openEditor = async ( req, res ) => {
  let sound = await Sound.findOne({where:{id:req.params.id}});
  let author;
  const user = await User.findOne({ where: {id: sound.user_id}});
  const userID = await User.findOne({where: {login: req.session.superuser}})
  author = userID.id === sound.user_id && sound.user_id === user.id;
  if (author) {
    res.render('tracks/edit', { sound });
  } else {
    const message = 'У вас нет прав на редактирование и удаление данной записи'
    res.render('entries/error', { message })
  }
}

const updateSound = async (req, res) => {
  let sound;

  try { 
    sound = await Sound.update({ name: req.body.name, author: req.body.author },{where:{id:req.params.id}, returning: true, plain: true});
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }

  return res.json({ isUpdateSuccessful: true, entryID: sound[1].id });
}

module.exports =  { create, addLike, deleteTrack, openEditor, updateSound } 
