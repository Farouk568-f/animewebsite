import time
from seleniumwire import webdriver

# --- الإعدادات ---
# ضع هنا رابط الصفحة التي تحتوي على الفيديو، وليس رابط الفيديو نفسه
VIDEO_PAGE_URL = "https://cimawbas.org/%D9%85%D8%B3%D9%84%D8%B3%D9%84-the-sandman-%D8%A7%D9%84%D9%85%D9%88%D8%B3%D9%85-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A-%D8%A7%D9%84%D8%AD%D9%84%D9%82%D8%A9-1-%D9%85%D8%AA%D8%B1%D8%AC%D9%85%D8%A9/watch/"

# --- تهيئة المتصفح ---
# تهيئة خيارات Chrome (يمكن تشغيله في الخلفية بإضافة 'headless')
chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument('--headless') # لإخفاء نافذة المتصفح
chrome_options.add_argument('--ignore-certificate-errors') # لتجاهل أخطاء شهادة SSL

# إنشاء المتصفح مع تفعيل selenium-wire
driver = webdriver.Chrome(options=chrome_options)

print(f"جاري فتح الصفحة: {VIDEO_PAGE_URL}")
driver.get(VIDEO_PAGE_URL)

print("ننتظر لمدة 15 ثانية حتى يتم تحميل الفيديو وبدء الطلبات...")
# قد تحتاج لزيادة هذه المدة أو استبدالها بانتظار عنصر معين
# في بعض الأحيان، تحتاج إلى محاكاة النقر على زر التشغيل
# play_button = driver.find_element(By.CSS_SELECTOR, '.play-button-selector')
# play_button.click()
time.sleep(15)

# --- البحث عن رابط M3U8 في الطلبات ---
m3u8_url = None
for request in driver.requests:
    if request.response and ".m3u8" in request.url:
        print(f"تم العثور على طلب M3U8: {request.url}")
        # عادةً ما يكون أول رابط هو الأهم (Master)
        m3u8_url = request.url
        # يمكنك فحص الهيدرز أو المحتوى للتأكد
        print(f"  - Status Code: {request.response.status_code}")
        print(f"  - Content-Type: {request.response.headers.get('Content-Type')}")
        break # نكتفي بأول رابط نجده

# --- النتيجة ---
if m3u8_url:
    print("\n✅ تم استخراج رابط M3U8 بنجاح:")
    print(m3u8_url)
else:
    print("\n❌ لم يتم العثور على أي رابط M3U8. جرب زيادة مدة الانتظار أو تفاعل مع الصفحة.")

# إغلاق المتصفح
driver.quit()