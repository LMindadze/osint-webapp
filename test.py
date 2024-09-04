from selenium import webdriver
from selenium.webdriver.common.by import By
import unittest
import time

class OSINTWebAppTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_load_homepage_theHarvester(self):
        driver = self.driver
        driver.get("http://localhost:3000/")

        domain_input = driver.find_element(By.NAME, 'domain')
        domain_input.send_keys('example.com')

        tool_select = driver.find_element(By.NAME, 'tool')
        for option in tool_select.find_elements(By.TAG_NAME, 'option'):
            if option.text == 'theHarvester':
                option.click()
                break

        submit_button = driver.find_element(By.XPATH, '//button[text()="Scan"]')
        submit_button.click()

        time.sleep(30)

        results_container = driver.find_element(By.CLASS_NAME, 'scan-results-container')
        self.assertTrue(len(results_container.find_elements(By.CLASS_NAME, 'result-card')) > 0)

    def test_load_homepage_amass(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        domain_input = driver.find_element(By.NAME, 'domain')
        domain_input.send_keys('example.com')

        tool_select = driver.find_element(By.NAME, 'tool')
        for option in tool_select.find_elements(By.TAG_NAME, 'option'):
            if option.text == 'Amass':
                option.click()
                break

        submit_button = driver.find_element(By.XPATH, '//button[text()="Scan"]')
        submit_button.click()

        time.sleep(60)

        results_container = driver.find_element(By.CLASS_NAME, 'scan-results-container')
        self.assertTrue(len(results_container.find_elements(By.CLASS_NAME, 'result-card')) > 0)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
