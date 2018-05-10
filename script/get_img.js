


function ccgIfElse(image) {
  if (sandBox == 'sand_box') {
    var sandBoxs = listening_cover.replace(/sand_box/,'..');
    $api.append(single, '<div class="single_img fl"><img src="'+ sandBoxs +'" alt=""></div><div class="single_l fl"><div class="single_h1" id="tingdanliebiaobiaoti">'+ret.data.linstening_info.listening_name+'</div><div class="single_img_p_span"><div class="single_div_img fl"><img src="'+ret.data.linstening_info.photo+'" alt=""></div><div class="single_img_name fl">'+ret.data.linstening_info.nick_name+'</div></div><div class="single_time"><div class="single_time_img fl"><img src="../image/KM_sc.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.collection_total+'</div><div class="single_time_img fl"><img src="../image/KM_play.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.song_total+'</div><div class="single_time_img fl"><img src="../image/read/aloud_py.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.play_total+'</div></div></div>')
  }else if (listening_cover == '') {
    $api.append(single, '<div class="single_img fl"><img src="../image/my/fnShareImg.jpg" alt=""></div><div class="single_l fl"><div class="single_h1" id="tingdanliebiaobiaoti">'+ret.data.linstening_info.listening_name+'</div><div class="single_img_p_span"><div class="single_div_img fl"><img src="'+ret.data.linstening_info.photo+'" alt=""></div><div class="single_img_name fl">'+ret.data.linstening_info.nick_name+'</div></div><div class="single_time"><div class="single_time_img fl"><img src="../image/KM_sc.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.collection_total+'</div><div class="single_time_img fl"><img src="../image/KM_play.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.song_total+'</div><div class="single_time_img fl"><img src="../image/read/aloud_py.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.play_total+'</div></div></div>')
  }else {
    var listening = 'listening/';
    var listening_covers = http + listening + listening_cover;
    $api.append(single, '<div class="single_img fl"><img src="'+ listening_covers +'" alt=""></div><div class="single_l fl"><div class="single_h1" id="tingdanliebiaobiaoti">'+ret.data.linstening_info.listening_name+'</div><div class="single_img_p_span"><div class="single_div_img fl"><img src="'+ret.data.linstening_info.photo+'" alt=""></div><div class="single_img_name fl">'+ret.data.linstening_info.nick_name+'</div></div><div class="single_time"><div class="single_time_img fl"><img src="../image/KM_sc.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.collection_total+'</div><div class="single_time_img fl"><img src="../image/KM_play.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.song_total+'</div><div class="single_time_img fl"><img src="../image/read/aloud_py.png" alt=""></div><div class="single_img_num fl">'+ret.data.linstening_info.play_total+'</div></div></div>')
  }
  var userinfo = $api.byId('userinfo');
  $api.append(userinfo, '<div class="userinfocol" tapmode="toolhover" onclick="collectmusicFx(this)" data-click="0"><div class="info"><img src="../image/KM_ListingsListDzs.png" alt="" class="collectmusicFx"></div><p>'+ret.data.linstening_info.good_total+'</p></div><div class="userinfocol" tapmode="toolhover" onclick="collectmusic(this)" data-click="0"><div class="info"><img src="../image/KM_hxs.png" alt="" class="collectmusic"></div><p>收藏</p></div><div class="userinfocol" tapmode="toolhover" onclick=""><div class="info"><img src="../image/KM_ListingsListYzpd.png" alt=""></div><p>预置频道</p></div><div class="userinfocol" tapmode="toolhover" onclick="fnOpenDiscussDetail('+ ret.data.linstening_info.l_id +'); "><div class="info"><img src="../image/KM_ListingsListSx.png" alt=""></div><p>'+ret.data.linstening_info.comment_total+'</p></div><div class="userinfocol" tapmode="toolhover" onclick="fnOpenPlayShare();"><div class="info"><img src="../image/KM_ListingsListGd.png" alt=""></div><p>分享</p></div>');
  songList(ret);
} else {
  api.toast({
      msg: '失败',
      duration: 2000,
      location: 'middle'
  });
}
