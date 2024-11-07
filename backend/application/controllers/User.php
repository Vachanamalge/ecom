<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('User_model'); // Ensure the model is loaded correctly
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST");
    }

    public function register() {
        // Get the input data
        $data = json_decode(file_get_contents("php://input"), true);
    
        // Log incoming data for debugging
        log_message('debug', 'Register data: ' . json_encode($data));
    
        // Validate input data
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
            return;
        }
    
        // Check if the username or email already exists
        if ($this->User_model->username_exists($data['username'])) {
            echo json_encode(['status' => 'error', 'message' => 'Username already exists.']);
            return;
        }
    
        if ($this->User_model->email_exists($data['email'])) {
            echo json_encode(['status' => 'error', 'message' => 'Email already exists.']);
            return;
        }
    
        // Hash the password
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
    
        // Attempt to register the user
        if ($this->User_model->register($data)) {
            echo json_encode(['status' => 'success']);
        } else {
            // Log the last query for debugging
            log_message('error', 'Registration failed: ' . $this->db->last_query());
            echo json_encode(['status' => 'error', 'message' => 'Registration failed']);
        }
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate input data
        if (empty($data['username']) || empty($data['password'])) {
            echo json_encode(['status' => 'error', 'message' => 'Username and password are required']);
            return;
        }
    
        // Check for the admin credentials directly
        if ($data['username'] === 'admin' && $data['password'] === '1234') {
            echo json_encode(['status' => 'success', 'user' => ['username' => 'admin', 'role' => 'admin']]);
            return;
        }
        if ($data['username'] === 'guest' && $data['password'] === '1234') {
            echo json_encode(['status' => 'success', 'user' => ['username' => 'guest', 'role' => 'guest']]);
            return;
        }
    
        // Fetch user from the database
        $user = $this->User_model->get_user($data['username']);
        
        if ($user && password_verify($data['password'], $user['password'])) {
            // Assuming the user table has a 'role' column
            echo json_encode(['status' => 'success', 'user' => ['username' => $user['username'], 'role' => $user['role']]]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        }
    }
}