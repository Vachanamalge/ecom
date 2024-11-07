<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function username_exists($username) {
        // Check if the username exists in the database
        $query = $this->db->get_where('users', ['username' => $username]);
        return $query->num_rows() > 0;
    }

    public function email_exists($email) {
        // Check if the email exists in the database
        $query = $this->db->get_where('users', ['email' => $email]);
        return $query->num_rows() > 0;
    }

    public function register($data) {
        // Add the user to the database
        return $this->db->insert('users', $data);
    }

    public function get_user($username) {
        // Retrieve the user from the database
        $query = $this->db->get_where('users', ['username' => $username]);
        return $query->row_array();
    }
}