'''
pip install beautifulsoup4
pip install requests
pip install selenium
pip install lxml


@@ 강의 확인 모드 / 해당주차 강의 수강 모드 / 모든 주차 강의 수강 모드
'''

import requests
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import datetime
import time
import os


#--------------Settings--------------#

# 드라이버 위치
driver_path = './chromedriver.exe'
# 해당학기 수강 과목 수
numOfLec = 7

# 로그인 페이지 url
urlOfLogin = "http://ecampus.konkuk.ac.kr/ilos/main/member/login_form.acl"
# 강의 리스트 페이지 url
urlOfLecture = 'http://ecampus.konkuk.ac.kr/ilos/mp/course_register_list_form.acl'


# 모드 설정
'''
강의 수강 = 0
강의 체크 = 1
'''

mode = 0



# 아이디 비밀번호
my_id = 'ech97'
my_pw = '@@sg1234'

# 언어 선택
lang = 'ko' # 'en' 도 만들까?


#--------------System Variable--------------#

t = datetime.datetime.now()
t = t.isocalendar()
curr_week = t[1] - 8
curr_week_ind = curr_week - 1
browser = webdriver.Chrome(driver_path)
# Setting user agent as Chrome/89.0.4389.114
browser.execute_cdp_cmd('Network.setUserAgentOverride', {"userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'})



#--------------Language--------------#

if lang == 'ko':
    splitHour = '시'
    splitMin = '분'
    splitSec = '초'

if lang == 'en':
    splitHour = 'Hour'
    splitMin = 'Min'
    splitSec = 'Second'



def get_text(data):
    return data.get_text()

def clear():
    os.system('cls')

def time_parser(time, flag = False):
    
    if flag:
        hour = 0
        minute = 0
        second = 0

        a = time

        if splitHour in a:
            a = a.strip().split(splitHour)
            hour = int(a[0])

            if splitMin in a[1]:
                a = a[1].strip().split(splitMin)
                a = [x for x in a if x]
                minute = int(a[0])
                    
                if len(a) > 1: 
                    a = a[1].strip().split(splitSec)
                    a = [x for x in a if x]
                    second = int(a[0])

            elif splitSec in a[1]:
                a = a[1].strip().split(splitSec)
                a = [x for x in a if x]
                second = int(a[0])

        else:
            if splitMin in a:
                a = a.strip().split(splitMin)
                minute = int(a[0])
                    
                if splitSec in a[1]: 
                    a = a[1].strip().split(splitSec)
                    a = [x for x in a if x]
                    second = int(a[0])

            elif splitSec in a: 
                a = a.strip().split(splitSec)
                second = int(a[0])

        # print(hour, minute, second)

        return hour * 3600 + minute * 60 + second


    if not flag:

        hour = time // 3600
        minute = (time % 3600) // 60
        second = (time % 60)

        return hour, minute, second

def login(browser):
    browser.get(urlOfLogin)
    
    # Check Login State
    try:
        browser.find_element_by_class_name('header_logout')
    except:
        browser.find_element_by_id("usr_id").send_keys(my_id)
        browser.find_element_by_id("usr_pwd").send_keys(my_pw)
        browser.find_element_by_id("login_btn").click()
    
    # Wait For Login
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'sub_open')))
    
    browser.get(urlOfLecture)
    # Wait For Page Loading
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'content-title')))

def idxOfLecture(browser):
    
    soup = BeautifulSoup(browser.page_source, "lxml")
    
    global lsOfLec
    lsOfLec = list(map(get_text, soup.find_all(attrs = {"class" : "content-title"})))

    print('num\t|\tlecture')
    for idx, name in enumerate(lsOfLec):
        print(f'{idx}\t|\t{name}')
    print('\n\n')

def selLecture(browser, i):
    browser.get(urlOfLecture)
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'content-title')))
    elem = browser.find_elements_by_class_name('content-title')

    elem[i].click()
    
    if not mode:
        clear()
        print(f'\n\n현재강의: {lsOfLec[i]}')

def lecInfo(browser):
    soup = BeautifulSoup(browser.page_source, "lxml")    
    try:
        lecture_info = soup.find_all(attrs = {"class" : "wb-status"})[curr_week_ind].get_text()
        return lecture_info

    except:
        if not mode:
            print('해당주차 강의가 아직 개설되지 않았습니다')
        return 0

def weekOfLec(browser):

    if not mode:
        print(f'\n------ today is {curr_week}th week ------\n')
    
    # Enter the week of lecture
    browser.find_elements_by_class_name("wb-week-on")[curr_week_ind].click()
    
    # @@ WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.CLASS_NAME, 'graph_gage site-background-color')))
    # 여기선 EC: site mouseover을 사용하면 안됨. 수강기간이 아니어서 클릭할 개체가 없을수도있어
    time.sleep(3)


    soup = BeautifulSoup(browser.page_source, "lxml")

    # 해당주차 강의시간 저장
    global timesOfLec
    timesOfLec = list(map(get_text, soup.find_all("div", attrs = {"style" : "float: left;margin-left: 7px;margin-top:3px;"})))
    
    # 클릭할 강의
    elems = browser.find_elements_by_class_name('site-mouseover-color')
    
    # 0/2와 같이 수강할 과목은 있으나, 수강기간이 아닌경우
    if(len(elems) == 0):
        return 0
    else:
        return elems

def timeOfLec(browser, t):
    periodSec = time_parser(t.split('/')[0], flag = True)
    oPeriodSec = time_parser(t.split('/')[1], flag = True) 
    requireSec = time_parser(t.split('/')[2], flag = True)

    secOfPlay = requireSec - oPeriodSec - periodSec
    return secOfPlay

def printTime(nameOfLec, secOfPlay):
    leftH, leftM, leftS = time_parser(secOfPlay, flag = False)
    left_time = '{0}시간 {1}분 {2}초'.format(leftH, leftM, leftS)
    print(f'[{nameOfLec}] 강의를   [{left_time}] 동안 수강합니다.')

def process():
    # login & enter Lecture list page
    login(browser)

    idxOfLecture(browser)

    for i in range(numOfLec):  # Select Lecture
        
        selLecture(browser, i)
    
        try:
            WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.CLASS_NAME, 'wb-week')))
        except:
            if not mode:
                print('다른 버전의 수강 페이지거나, 아직 해당주차의 강의가 올라오지 않았습니다.')
            continue

        
        # 이번주차 강의 정보 따옴 0/2 하지만 이번주차 탭이 없다면?
        lectureInfo = lecInfo(browser)
        if lectureInfo == 0:
            if not mode:
                print('해당 주차에 올라온 강의가 없습니다.')
            continue


        # 수강할 과목이 남아있는지
        a = list(map(int, lectureInfo.split('/')))
        if a[0] == a[1]:
            print('이미 모든 강의를 수강하였습니다.')
            continue

        # 해당주차 들어가기
        elems = weekOfLec(browser)
        
        if elems == 0:
            if not mode:
                print("아직은 수강기간인 강의가 없습니다")
            continue

        for j, elem in enumerate(elems):
            
            secOfPlay = timeOfLec(browser, timesOfLec[j])
            if secOfPlay < 0:
                continue
            
            # Click할 Element가 로딩될때까지 기다려야함 
            WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'site-mouseover-color')))
            elem = browser.find_elements_by_class_name('site-mouseover-color')[j]
            lecName = elem.text
            
            if mode == 1:
                
                print('\n--------------------------------------------------------------')
                print(f'{lsOfLec[i]} / {lecName} / {secOfPlay}초 만큼 수강하셔야 합니다.')
                print('--------------------------------------------------------------\n')
                continue

            elem.click()
            
            # 인증창 뜰수있음
            try:
                WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.ID, 'close_')))
            except:
                # 다른 브라우저에서 강의를 시청중입니다 팝업 해제 후 다시 찾아서 클릭해줘야함 @@@@@
                print("현재 인증창이 떴습니다 60초안에 해결해주세요")
                try:
                    WebDriverWait(browser, 60).until(EC.presence_of_element_located((By.ID, 'close_')))
                except:
                    print("인증에 실패하였습니다. 5초 후 프로그램을 종료합니다")
                    time.sleep(5)
                    exit()
            
            printTime(lecName, secOfPlay)

            # 강의 수강동안 대기
            time.sleep(secOfPlay + 10)
            
            browser.find_element_by_id('close_').click()
            time.sleep(4)
            try:
                browser.switch_to.alert.accept()
                # 사실 없어도 되는 delay
                time.sleep(2)
            except:
                continue

if __name__ == "__main__":
    process()


