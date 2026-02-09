# Feature: it is a keyword where we declare the module/functionality name, the first step I the 
# feature file should be the feature keywords

Feature: login Module or Feature full story

# Scenario/scenario outline: it is used to create/add a test case
# Scenario: Userstory/ Testcase name

# Given: It is the first step here we will launch the application
# When: to provide/create the condition
# Then: to verify the condition/assertions

@Regression
Scenario:  login facebook
Given I launch the browser
When I launch the test automation
Then I close the browser

@regression1
Scenario:  login facebook
Given I launch the browser
When I launch the test automation
Then verify Xpath and CSS locators
Then I close the browser1

@regression2
Scenario:  login facebook
Given I launch the browser
When I launch the test automation
Then verify the playwright methods
Then I close the browser2

@regression3
Scenario:  login facebook
Given I launch the browser
When I launch the test automation
Then verify the playwright methods2
Then I close the browser3

@ewgression4
Scenario:  login facebook
Given I launch the browser
When I launch the test automation
Then verify the playwright methods3
Then I close the browser4

@regression5
Scenario:  playwright methods4
Given I launch the browser
When I launch the test automation
Then verify the playwright methods4
Then I close the browser5


