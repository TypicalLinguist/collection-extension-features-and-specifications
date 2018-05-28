Feature:
  As John a developer I need to be able to use lodash type array functionality like it is part of native arrays

  @compileCode
  Scenario: Compiling code that uses lodash type array functionality
    Given I have installed '@typical-linguist/collections-extension'
    And wrote code that has no other syntactical or semantic errors
    When I compile the code
    Then I should not see any errors
    And The compiled code should exist

  @executeCode
  Scenario: Executing the compiled code
    Given I have installed '@typical-linguist/collections-extension-transformer'
    And I have included the transformer in my package config
    And the code has no other logical errors
    And the code has been compiled
    When I execute the compiled code
    Then the code should execute without fail