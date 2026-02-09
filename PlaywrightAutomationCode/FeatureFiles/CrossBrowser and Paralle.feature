# Feature: it is a keyword where we declare the module/functionality name, the first step I the 
# feature file should be the feature keywords

Feature: login Module or Feature full story

# Scenario/scenario outline: it is used to create/add a test case
# Scenario: Userstory/ Testcase name

# Given: It is the first step here we will launch the application
# When: to provide/create the condition
# Then: to verify the condition/assertions

@regression
Scenario:  login functionality
Given I launch the chrome browser
When I launch the test automation site
Then I launch the different web browsers
Then I close the diffbrowser

@regression
Scenario:  login functionality
Given I launch the webkit browser
When I launch the test automation site
Then I launch the different web browsers
Then I close the diffbrowser

@regression
Scenario:  login functionality
Given I launch the safari browser
When I launch the test automation site
Then I launch the different web browsers
Then I close the diffbrowser

@regressionl
Scenario:  login functionality
Given I launch the chrome headless browser
When I launch the test automation site
Then I launch the different web browsers
Then I close the diffbrowser
