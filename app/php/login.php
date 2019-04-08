<?php
  $json = file_get_contents("php://input");
  $json = json_decode($json);
//   var_dump($json);
  $phone = $json -> phone;
  $coon = new Mysqli("localhost","root","root","db_user");
  $sql = "INSERT into `zhuce` (phone) VALUES ('$phone')";
//   var_dump($sql);
  $coon->query("SET CHARACTER SET 'utf8'");
  $coon->query("SET NAMES 'utf8'");
  $result = $coon -> query($sql);
  if($result){
      //注册成功
      $arr = array("code" => "200", "msg" => "");
    //   echo "注册成功";
  }else{
      //注册失败
      $arr = array("code" => "1000", "msg" => "注册失败,手机号码不对,请输入正确号码");
    //   echo "注册失败";
  }
  echo json_encode($arr);
?>