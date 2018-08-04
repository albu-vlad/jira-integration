<?php

namespace Drupal\issue_tracker\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Class IssueTrackerAdmin.
 */
class IssueTrackerAdmin extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'issue_tracker.issuetrackeradmin',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'issue_tracker_admin';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $url = Url::fromUri('https://en.wikipedia.org/wiki/Email_address#Local-part', [
      'attributes' => [
        'target' => '_blank',
      ],
    ]);
    $local_part = Link::fromTextAndUrl(t('local-part'), $url);

    $config = $this->config('issue_tracker.issuetrackeradmin');
    $form['jira_rest_query'] = [
      '#type' => 'textfield',
      '#title' => $this->t('jira rest query'),
      '#maxlength' => 260,
      '#size' => 64,
      '#default_value' => $config->get('jira_rest_query'),
      '#description' => t('example: https://[server]/rest/api/2/search?jql=resolution %3D Unresolved AND assignee in ([@local-part of email])&expand=renderedFields', [
        '@token' => $local_part->toString(),
      ]),
    ];
    $form['jira_email'] = [
      '#type' => 'textfield',
      '#title' => $this->t('jira email'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('jira_email'),
    ];
    $form['jira_token'] = [
      '#type' => 'textfield',
      '#title' => $this->t('jira token'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('jira_token'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('issue_tracker.issuetrackeradmin')
      ->set('jira_rest_query', $form_state->getValue('jira_rest_query'))
      ->set('jira_email', $form_state->getValue('jira_email'))
      ->set('jira_token', $form_state->getValue('jira_token'))
      ->save();
  }

}
