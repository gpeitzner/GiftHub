import time
import unittest
from selenium import webdriver


class GifthubLoginSuccess(unittest.TestCase):

    def setUp(self):
        PATH = 'C:\\Program Files (x86)\\chromedriver.exe'
        self.driver = webdriver.Chrome(PATH)
        self.driver.get("http://localhost:4200/login")

    def test_gifthub_login_success(self):
        username = self.driver.find_element_by_name("access")
        username.send_keys("guillermopeitzner@gmail.com")
        password = self.driver.find_element_by_name("password")
        password.send_keys("123asd")
        login_button = self.driver.find_element_by_id("login")
        login_button.click()
        time.sleep(2)
        assert "http://localhost:4200/Catalogo" in self.driver.current_url

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
