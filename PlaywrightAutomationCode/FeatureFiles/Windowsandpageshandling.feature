Feature: Background keyword 

# Scenario/scenario outline: it is used to create/add a test case
# Scenario: Userstory/ Testcase name

# Given: It is the first step here we will launch the application
# When: to provide/create the condition
# Then: to verify the condition/assertions

Background: Common steps
Given I launch the chrome browser
When I launch the test automation site

@regression1
Scenario:  Windows and Pages Handling
Then Windows and Pages Handling
Then I close the browser0v