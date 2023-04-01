package ee.planet.meeli.backend.controller;

import ee.planet.meeli.backend.model.User;
import ee.planet.meeli.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable("id") Integer id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users/addnew")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("/users/{id}/update")
    public void updateUser(@PathVariable("id") Integer id, @RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/users/delete/{id}")
    public void deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
    }
}
