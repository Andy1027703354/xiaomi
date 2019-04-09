<?php
  $json = file_get_contents("php://input");
  $json = json_decode($json);
//   var_dump($json);
  $username = $json -> username;
  $pwd = $json -> pwd;
 
  $coon = new Mysqli("localhost","root","root","db_user");
  $sql = "select * from users where username='$username' and pwd='$pwd'";

//   var_dump($sql);
  $coon->query("SET CHARACTER SET 'utf8'");
  $coon->query("SET NAMES 'utf8'");
  $row = $coon -> query($sql);
  $result = $row -> fetch_assoc();
//   var_dump($result);
  if($result){
      //登录成功
      $arr = array("code" => "200", "msg" => "","data" => array("name" => $result['username']));
    //   echo "注册成功";
  }else{
      //登录失败
      $arr = array("code" => "1000", "msg" => "登录失败,用户名或密码错误");
    //   echo "登录失败";
  }
  echo json_encode($arr);
?>