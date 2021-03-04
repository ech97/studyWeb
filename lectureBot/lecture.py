'''
pip install beautiful4
pip install requests
pip install selenium
pip install lxml

# 강의 모드 추가 (마프같은 강의는 바꿔줘얗마)
'''

import requests
from bs4 import BeautifulSoup

from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import datetime
import subprocess
import platform
import time
import os

#---Variable---#
driver_path = './chromedriver.exe'
chrome_path = 'C:/Program Files/Google/Chrome/Application'
print(chrome_path)

instr = 'cd '+chrome_path
instr2 = 'chrome.exe --remote-debugging-port=9222 --user-data-dir="C:/ChromeTEMP"'

lecture_num = 6
lecture_list = []

t = datetime.datetime.now()
t = t.isocalendar()
curr_week = t[1] - 8
curr_week_ind = curr_week - 1


url = "http://ecampus.konkuk.ac.kr/ilos/main/member/login_form.acl"
url2 = 'http://ecampus.konkuk.ac.kr/ilos/mp/course_register_list_form.acl'

my_id = 'ech97'
my_pw = '@@sg1234'


lang = 'en' # 'ko' && 'en'

#---Language---#

if lang == 'ko':
    splitHour = '시'
    splitMin = '분'
    splitSec = '초'

if lang == 'en':
    splitHour = 'Hour'
    splitMin = 'Min'
    splitSec = 'Second'

#---Settings---#
subprocess.call(instr + '&&' + instr2, shell=True)


chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")

browser = webdriver.Chrome(driver_path, options=chrome_options)

'''
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            "Accept-Language" : "ko-KR,ko"}
'''

#---Function---#

def get_text(data):
    return data.get_text()

def clear():
    if platform.system() == 'Windows':
        os.system('cls')
    else:
        os.system('clear')

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
                    
                if splitSec in a[1]: 
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

'''
def lecture_play(browser, my_sec, class_sec) :
    return 0
'''    

#---Code---#

# login
browser.get(url)

# 로그인이 되었는지 체크
try:
    browser.find_element_by_class_name('header_logout')

except:
    browser.find_element_by_id("usr_id").send_keys(my_id)
    browser.find_element_by_id("usr_pwd").send_keys(my_pw)
    browser.find_element_by_id("login_btn").click()


# lecture
WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'sub_open')))

browser.get(url2)

WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'content-title')))
soup = BeautifulSoup(browser.page_source, "lxml")
lecture_list = list(map(get_text, soup.find_all(attrs = {"class" : "content-title"})))

print('num\t|\tlecture')
for idx, name in enumerate(lecture_list):
    print(f'{idx}\t|\t{name}')
    if idx >= lecture_num:
        break


number = 0
for x in range(lecture_num + 1):
    # select lecture

    browser.get(url2)
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'content-title')))

    number = int(input('\nchoose your lecture: '))

    elem = browser.find_elements_by_class_name('content-title')
    elem[number].click()
    clear()

    print(f'You chose {lecture_list[number]}')


    # lecture info
    try:
        WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.CLASS_NAME, 'wb-week')))
    except:
        print('현재 올라온 강의가 없습니다.')
        continue


    soup = BeautifulSoup(browser.page_source, "lxml")
    lecture_info = soup.find_all(attrs = {"class" : "wb-status"})[curr_week_ind].get_text()

    print(f'\n------ today is {curr_week}th week ------\n')


    if lecture_info:
        a = list(map(int, lecture_info.split('/')))

        if a[0] < a[1]:
            print("There are still lectures left to take.")
            
            ##*** 학습기간이 시작되지 않았습니다.


            ## 강의 들어가기
            browser.find_elements_by_class_name("wb-week-on")[curr_week_ind].click()
            soup = BeautifulSoup(browser.page_source, "lxml")


            ## 강의시간 체크
            lecture_times = list(map(get_text, soup.find_all("div", attrs = {"style" : "float: left;margin-left: 7px;margin-top:3px;"})))
            a = len(lecture_times)


            for idx in range(a):
                # print(lecture_times[idx].split('/'))
                
                # 기간 내 학습시간
                my_sec = time_parser(lecture_times[idx].split('/')[0], flag = True)
                
                # 필요 학습시간
                class_sec = time_parser(lecture_times[idx].split('/')[2], flag = True)

                print(my_sec, class_sec)

                play_sec = class_sec - my_sec


                # 강의 시청
                if play_sec > 0:
                    browser.find_elements_by_class_name('view')[idx].click()
                    # 인증창 뜰수있음
                    try:
                        WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.ID, 'close_')))
                    except:
                        print("현재 인증창이 떴습니다 30초안에 해결해주세요")
                        time.sleep(30)

                    time.sleep(play_sec // 500)
                    
                    browser.find_element_by_id('close_').click()
                    time.sleep(2)
                    try:
                        browser.switch_to.alert.accept()
                    except:
                        continue
                    

                # 한 강의에 여러개의 딸림강의가 있는 경우
                # navi-tables 의 li태그 개수가 1개가 넘어가는경우@@

            # 다음강의 체크하러 고고씽

        elif a[0] == a[1]:
            print('이미 모든 강의를 수강하였습니다.')



