<?php

require_once "/jianbing/base/act/application/views/huodong/Lp/base.php";

class API{

    private function decodeUid($code_uid){
        if($code_uid == '95508'){
            return 21895384;
        }
        $code_uid = strtolower($code_uid);
        $str_dict = "jb6tr1mgxsvclk4yiwqz2do05anp7fue389h";
        $str1 = strpos($str_dict,substr($code_uid,0,1))*1679616;
        $str2 = strpos($str_dict,substr($code_uid,1,1))*46656;
        $str3 = strpos($str_dict,substr($code_uid,2,1))*1296;
        $str4 = strpos($str_dict,substr($code_uid,3,1))*36;
        $str5 = strpos($str_dict,substr($code_uid,4,1));
        return $str1 + $str2 + $str3 + $str4 + $str5;
    }

    public function getPhoneCode($data){
        
        if (!isset($data['phone'])) {
            throw new Exception("请填写手机", 100);
        }
        $phone = trim($data['phone']);
        if (empty($phone)) {
            throw new Exception("手机不能为空", 1);
            
        }
        if(!preg_match("/^1[34578]{1}\d{9}$/",$phone)){
            throw new Exception("手机格式错误", 100);
        }

        if (getDB()->GetOneInt("select count(1) from sys_user where passport = ? and yys_cid = 10",$phone)!=0) {
            throw new Exception("你已注册，请前往下载", 512); 
        }

        $key = "phone:code:times:".$phone;
        $num = getMem()->get($key);
        if ($num == false) {
            $num = 0;
        }
        $num++;
        if ($num >= 3) {
            throw new Exception("您已经使用完今天获取验证码次数", 100);
        }
        getMemSet($key,''.$num,strtotime(date('Y-m-d',strtotime('+1 day')))-time());

        $key = "phone:code:".$phone;
        $delay = getMem()->get($key);
        if (!empty($delay)) {
            throw new Exception("获取验证码过于频繁", 100);
        }
        getMemSet($key,'lock',60);

        $code = mt_rand(1, 9999);
        $code = str_pad($code, 4, "0", STR_PAD_LEFT);

        session_start();
        $_SESSION['martket_phone_code']=array('delay'=>time()+15*60,'code'=>$code,'phone'=>$phone);
        session_commit();

        sendSmsMessage($phone, "您本次操作的短信验证码为".$code.",切勿告诉他人！");
    }

    public function register($data){
        $ret = array();
        if (empty($data['phone'])) {
            throw new Exception("请填写手机", 100);
        }
        if (empty($data['code'])) {
            throw new Exception("请填写验证码", 100);
        }
        // if (empty($data['place'])) {
        //     throw new Exception("网页配置出错", 100);
        // }
        $phone = $data['phone'];
        $code = $data['code'];
        $place = isset($data['place'])?$data['place']:null;

        $place_cid = !empty($place)?getDB()->CacheGetOneInt("select cid from cfg_place where place = ?",$place):0;
        // if ($place_cid == 0) {
        //     throw new Exception("网页配置出错", 100);
        // }

        if (getDB()->GetOneInt("select count(1) from sys_user where passport = ? and yys_cid = 10",$phone)!=0) {
            throw new Exception("你已注册，请前往下载", 512); 
        }

        session_start();
        if (!isset($_SESSION['martket_phone_code'])) {
            throw new Exception("验证码已过期", 100);
        }else{
            $phone_code = $_SESSION['martket_phone_code'];
        }
        session_commit();
            
        if ($phone_code['delay']>time()) {
            if($phone_code['phone']===$phone && $phone_code['code']===$code){
                // getDB()->Execute("INSERT INTO sys_phone_place (phone,place_cid) VALUES (?,?) ON DUPLICATE KEY UPDATE place_cid = ?",array($phone,$place_cid,$place_cid));
                if (isset($_SERVER['HTTP_REFERER'])) {
                    $referer = $_SERVER['HTTP_REFERER'];
                    $urlarray = parse_url($referer);
                    if (isset($urlarray['query'])) {
                        parse_str($urlarray['query'],$query);
                    }else{
                        $query = array();
                    }
                    if (isset($query['c'])) {
                        $ret['a']='fddf';

                        $code = $query['c'];
                        $inviter_uid = $this->decodeUid($code);
                        $inviter_exist = getDB()->GetRow("select sid,place_cid from sys_user where sid = ? and yys_cid = 10",$inviter_uid);
                        if(!$inviter_exist){
                            throw new Exception('邀请码不存在。');
                        }

                        $place_cid = $inviter_exist['place_cid'];

                        getDB()->Execute("insert into sys_user(passport,yys_cid,phone,time,place_cid) values (?,10,?,CURRENT_TIMESTAMP ,?)", array($phone,$phone,$place_cid));
                        $user_sid = getDB()->Insert_ID();

                        $invite_count = getDB()->GetOneInt("select count(1) from sys_invitation where inviter_uid = ?",$inviter_uid);

                        if($invite_count < 7){//超过7人，不算
                            getDB()->Execute("insert into sys_invitation(inviter_uid,guest_uid,inviter_reward,guest_reward,state,guest_phone) VALUES (?,?,500,300,1,?)",array($inviter_uid,$user_sid,$phone));//待处理的奖励
                        }else{
                            getDB()->Execute("insert into sys_invitation(inviter_uid,guest_uid) VALUES (?,?)",array($inviter_uid,$user_sid));//默认为0，不需要处理
                        }
                    }
                }
                getDB()->Execute("INSERT IGNORE INTO  sys_phone_place (phone,place,place_cid) VALUES (?,?,?)",array($phone,$place,$place_cid));
            }else{
                throw new Exception("验证码不正确", 100);
            }
        }
        return $ret;
    }

    function lazyRegister($data){
        if (empty($data['phone'])) {
            throw new Exception("请填写手机", 100);
        }
        // if (empty($data['place'])) {
        //     throw new Exception("网页配置出错", 100);
        // }
        $phone = $data['phone'];
        $place = isset($data['place'])?$data['place']:null;

        $place_cid = !empty($place)?getDB()->CacheGetOneInt("select cid from cfg_place where place = ?",$place):0;
        // if ($place_cid == 0) {
        //     throw new Exception("网页配置出错", 100);
        // }

        if (getDB()->GetOneInt("select count(1) from sys_user where passport = ? and yys_cid = 10",$phone)!=0) {
            throw new Exception("你已注册，请前往下载", 512); 
        }

        //getDB()->Execute("INSERT INTO sys_phone_place (phone,place_cid) VALUES (?,?) ON DUPLICATE KEY UPDATE place_cid = ?",array($phone,$place_cid,$place_cid));
        getDB()->Execute("INSERT IGNORE INTO  sys_phone_place (phone,place,place_cid) VALUES (?,?,?)",array($phone,$place,$place_cid));
    }
}

if(isset($_REQUEST['action'])){
    $action = $_REQUEST['action'];
    $api = new API();
    if (method_exists($api,$action)) {
        try{
            $ret = $api->$action($_REQUEST);
            if (empty($ret)) {
                $ret = array();
            }
            $ret['errcode']=0;
        }catch ( Exception $e ) {
            $errcode = $e->getCode();
            $ret = array('errmsg'=>$e->getMessage(),'errcode'=>$errcode==0?1:$errcode);
        }
    }else{
        $ret = array('errcode'=>2);
    }
}

$outJson = json_encode ( $ret );
header('Content-type: application/json');
echo ($outJson);
