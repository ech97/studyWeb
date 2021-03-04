hour = 0
minute = 0
second = 0

a = ' 35초'
if '시' in a:
    a = a.strip().split('시')
    hour = int(a[0])
    print(a)

    if '분' in a[1]:
        a = a[1].strip().split('분')
        a = [x for x in a if x]
        minute = int(a[0])
            
        if '초' in a[1]: 
            a = a[1].strip().split('초')
            a = [x for x in a if x]
            second = int(a[0])

    elif '초' in a[1]: 
        a = a[1].strip().split('초')
        a = [x for x in a if x]
        second = int(a[0])


else:
    if '분' in a:
        a = a.strip().split('분')
        minute = int(a[0])
            
        if '초' in a[1]: 
            a = a[1].strip().split('초')
            a = [x for x in a if x]
            second = int(a[0])

    elif '초' in a: 
        a = a.strip().split('초')
        second = int(a[0])

print(hour, minute, second)