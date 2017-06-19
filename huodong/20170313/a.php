<?php
require_once "base.php";
require_once "../wxutil.php";
define('EVENT_HELPER_TAG', 'JB_EVENT_HELPER_TAG');

class EventHelper
{
    function trigger($event, $place_cid = 0, $user_sid = 0) {
        if (empty($event) || gettype($event) != 'string') {
            return;
        }
        $sql = "SELECT cid FROM cfg_event_tag where name = ?";
        $tag = getDB()->CacheGetOneInt($sql, $event);
        if (empty($tag)) {
            getDB()->CacheGetOneInt(-1, $sql, $event);
            getDB()->Execute("INSERT INTO cfg_event_tag (name) VALUES (?)", $event);
            $tag = getDB()->Insert_ID();
        }
        $params = array('tag' => $tag);
        $params['time'] = time();
        $params['place_cid'] = $place_cid;
        $params['user_sid'] = $user_sid;
        getMem()->rPush(EVENT_HELPER_TAG, json_encode($params));
    }
}

function getUser() {
    if (isset($_COOKIE['jianbing_customer_id'])) {
        return json_decode(json_encode(array('sid' => $_COOKIE['jianbing_customer_id'])));
    } else {
        return null;
    }
}

function getHost() {
    return $_SERVER['HTTP_HOST'];
}

function weChatUrl() {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    if (preg_match("/^(b)\.(jianbing)\.(com)/", $_SERVER['HTTP_HOST'])) {
        $url = $protocol . 'b.jianbing.com' . $_SERVER['REQUEST_URI'];
    } else {
        $url = null;
    }
    return $url;
}

class API
{

    function spm($type) {
        $user = getUser();
        if (is_array($type)) {
            $type = $type['event'];
        }
        switch ($type) {
            case "login":
                $tag = "信用卡定制进入页面170313";
                break;
            case 22:
                $tag = "浦发财星IC金170313";
                break;
            case 38:
                $tag = "浦发银联梦卡170313";
                break;
            case 34:
                $tag = "兴业立享白金悠170313";
                break;
            case 42:
                $tag = "兴业立享白金精英170313";
                break;
            case 43:
                $tag = "光大智能商务金170313";
                break;
            case 44:
                $tag = "光大龙腾白金170313";
                break;
            case "kaiqidingzhi":
                $tag = "点击开启定制170313";
                break;
            case "OneToFive":
                $tag = "点击1到5万170313";
                break;
            case "SixToThrity":
                $tag = "点击6到30万170313";
                break;
            case "pufa":
                $tag = "点击浦发银行170313";
                break;
            case "Up4000":
                $tag = "点击4000以上170313";
                break;
            case "Down4000":
                $tag = "点击4000以下170313";
                break;
            case "xingye":
                $tag = "点击兴业银行170313";
                break;
            case "guangda":
                $tag = "点击光大银行170313";
                break;
            case "Up2500":
                $tag = "点击2500以上170313";
                break;
            case "Down2500":
                $tag = "点击2500以下170313";
                break;
            default:
                $tag = "";
                break;
        }
        $helper = new EventHelper();
        if (!empty($user)) {
            $helper->trigger($tag, 1, $user->sid);
        } else {
            if (isset($_COOKIE['JBGUEST'])) {
                $guest_user_sid = $_COOKIE['JBGUEST'];
            } else {
                $guest_user_sid = time() - strtotime("2016-06-30");
                $guest_user_sid .= rand(0, 1000);
                setcookie("JBGUEST", $guest_user_sid, time() + 3600 * 24 * 365);
            }
            $helper->trigger($tag, 0, $guest_user_sid);
        }
    }

    function apply($data) { //22浦发财星IC金卡、34兴业立享白金卡悠系列、38浦发银联梦卡白金卡、42兴业立享精英白金卡、43光大智能商务金卡、44光大龙腾白金卡
        if (isset($data['type'])) {
            $type = $data['type'];
        } else {
            throw new Exception('数据异常，请稍后再试！');
        }
        if ($type == 22) {
            $this->getRedPacket(22);
        } elseif ($type == 38) {
            $this->getRedPacket(38);
        }
        $this->spm(intval($type));
        $bank_id = $type;
        $user = getUser();
        $host = getHost();
        $isWeiXin = is_weixin();
        if ($isWeiXin) {
            return array("url" => "https://{$host}/h5/?page=product&hid={$bank_id}");
        } else {
            $route = getShequDB()->GetOne("SELECT route FROM gjj_bank where bank_id = ?", $bank_id);
            if (empty($user)) {
                throw new Exception("请登录51公积金管家APP参与活动", 1);
            } else {
                $token = getShequDB()->CacheGetOne("SELECT token FROM gjj_customer WHERE sid = ?", $user->sid);
                return array("url" => "https://{$host}/shequ/discovery/index.php?route={$route}&bank_id={$bank_id}&user_sid={$user->sid}&token={$token}&from=creditCard20170313act");
            }
        }
    }

    function status() {
        $act_id = 49;
        $end_time = getHuodongDB()->GetOne("SELECT end_time FROM cfg_activity WHERE sid = ?", $act_id);
        $isEnd = (date('Y-m-d', time()) > $end_time) ? TRUE : FALSE;
        if ($isEnd) {
            throw new Exception('对不起，该活动已结束，请参与其他活动', 1);
        }
        $this->spm('login');
        $user = getUser();
        if (!empty($user)) {
            $dataNews['login'] = TRUE;
        } else {
            throw new Exception("请登录51公积金管家参与活动", 1);
        }
        return $dataNews;
    }

    function getRedPacket($type) {
        $user = getUser();
        if (!empty($user)) {
            $hasPrize = getHuodongDB()->GetOneInt("SELECT COUNT(1) FROM sys_gifts_to_user WHERE activity_id IN (44,47,48,49) AND gift_id IN (70,71,72,74,75,76,81,82) AND user_sid = ?", $user->sid);
            if (!$hasPrize) {
                //财星22梦卡38
                if ($type == 22) {
                    $to_act = 35;
                } else {
                    $to_act = 36;
                }
                $giftInfo = getHuodongDB()->GetRow("SELECT title,gift_id,activity_id FROM cfg_gifts_to_activity WHERE sid = ?", $to_act);
                getHuodongDB()->Execute("INSERT INTO sys_gifts_to_user(activity_id,gift_id,title,user_sid,status,date_wined,date_receive) VALUES(?,?,?,?,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)",
                    array($giftInfo['activity_id'], $giftInfo['gift_id'], $giftInfo['title'], $user->sid));
            }
        } else {
            throw new Exception("请登录51公积金管家APP再来参与活动", 1);
        }
    }
}