import requests
from bs4 import BeautifulSoup
import pyautogui


from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import os


def parseTime(text):
    timeArr = list(map(int, text.split(':')))
    return timeArr[0] * 60 + timeArr[1]



browser = webdriver.Chrome()
browser.maximize_window()

'''
로그인 하기
'''
time.sleep(30)

url = 'https://www.classtok.net/class/lecture/2222'
browser.get(url)

WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'lecture-item__duration')))

elem = browser.find_elements_by_class_name('lecture-item__duration')
numOfLecture = len(elem)

for idx, lecture in enumerate(elem):
    secOfLecture = parseTime(lecture.text) + 6
    
    # 녹화시작 단축키
    pyautogui.typewrite(['f2'])
    lecture.click()
    time.sleep(2)

    pyautogui.typewrite(['f'])
    
    time.sleep(secOfLecture) + 3

    pyautogui.typewrite(['f'])
    
    time.sleep(2)
    # 녹화 끝 단축키
    pyautogui.typewrite(['f4'])
